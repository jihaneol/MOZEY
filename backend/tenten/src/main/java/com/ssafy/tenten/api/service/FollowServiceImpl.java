package com.ssafy.tenten.api.service;

import com.ssafy.tenten.api.repository.FollowRepository;
import com.ssafy.tenten.api.repository.UserRepository;
import com.ssafy.tenten.domain.Follow;
import com.ssafy.tenten.domain.User;
import com.ssafy.tenten.vo.Response.RecommendUserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {
    private final UserRepository userRepository;

    private final FollowRepository followRepository;

    @Override
    @Transactional(readOnly = true)
    public List<RecommendUserResponse> searchFriendsByName(String name, Long fromUserId) {
        List<Follow> friends = followRepository.findAllByReceiverName(name, fromUserId);
        if (friends.isEmpty()) {
            throw new EntityNotFoundException("No users found in the database.");
        }
        List<User> user = new ArrayList<>();
        for (Follow friend : friends) {
            user.add(friend.getReceiverId());
        }
        List<RecommendUserResponse> collect = user.stream()
                .map(a -> RecommendUserResponse.builder()
                        .userId(a.getUserId())
                        .gender(a.getGender())
                        .image(a.getImage())
                        .name(a.getName())
                        .term(a.getTerm())
                        .campus(a.getCampus())
                        .group(a.getGroup())
                        .build())
                .collect(Collectors.toList());
        return collect;
    }

    @Override
    @Transactional(readOnly = true)
    public List<RecommendUserResponse> searchAllFriends(Long fromUserId) {
        List<Follow> friends = followRepository.findAllBySenderId(fromUserId);
        if (friends.isEmpty()) {
            throw new EntityNotFoundException("No users found in the database.");
        }
        List<User> user = new ArrayList<>();
        for (Follow friend : friends) {
            user.add(friend.getReceiverId());
        }
        List<RecommendUserResponse> collect = user.stream()
                .map(a -> RecommendUserResponse.builder()
                        .userId(a.getUserId())
                        .gender(a.getGender())
                        .image(a.getImage())
                        .name(a.getName())
                        .term(a.getTerm())
                        .campus(a.getCampus())
                        .group(a.getGroup())
                        .build())
                .collect(Collectors.toList());
        return collect;
    }

    // 친구 추가
    @Override
    @Transactional(readOnly = false)
    public boolean addFriend(Long fromUserId, Long toUserId) {
        // 나
        User from = userRepository.findById(fromUserId).orElseThrow(() -> new EntityNotFoundException("User not found with id: " + fromUserId));
        // 친구
        User to = userRepository.findById(toUserId).orElseThrow(() -> new EntityNotFoundException("User not found with id: " + toUserId));

        if (!userRepository.exists(fromUserId, toUserId)) {
            Follow follow = new Follow(from, to);
            followRepository.save(follow);
            return true;
        }
        return false;
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteFreind(Long fromUserId, Long toUserId) {
        followRepository.deleteBySenderId_userIdAndReceiverId_userId(fromUserId, toUserId);
    }
}
